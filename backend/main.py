from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

# Allow React (running on localhost:5173 or similar) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this later, fine for local dev
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models once at startup
stage1_model = joblib.load('return_risk_model.pkl')
stage1_columns = joblib.load('model_columns.pkl')
stage2_model = joblib.load('abuse_type_model.pkl')
stage2_columns = joblib.load('type_model_columns.pkl')

class ReturnRequest(BaseModel):
    age: int
    account_age_days: int
    avg_order_value_usd: float
    refund_amount_requested_usd: float
    is_high_value_item: int
    discount_used: int
    days_to_return: int
    total_orders_lifetime: int
    item_returned_opened: int
    return_packaging_intact: int
    photo_evidence_provided: int
    tracking_number_valid: int
    address_change_before_delivery: int
    refund_to_different_account: int
    customer_support_contacts: int
    previous_dispute_count: int
    review_left_after_return: int
    product_category: str
    return_reason: str
    customer_segment: str
    country: str
    platform: str
    device_type: str
    payment_method: str

@app.post("/predict")
def predict(req: ReturnRequest):
    input_df = pd.DataFrame([req.dict()])
    input_encoded = pd.get_dummies(input_df)
    input_encoded = input_encoded.reindex(columns=stage1_columns, fill_value=0)

    is_abusive = stage1_model.predict(input_encoded)[0]
    risk_score = stage1_model.predict_proba(input_encoded)[0][1]

    result = {
        "risk_score": round(float(risk_score) * 100, 1),
        "decision": "Abusive" if is_abusive == 1 else "Legitimate"
    }

    if is_abusive == 1:
        input_encoded_type = input_encoded.reindex(columns=stage2_columns, fill_value=0)
        abuse_type = stage2_model.predict(input_encoded_type)[0]
        result["abuse_type"] = abuse_type

    return result