# Return Risk Scorer

An AI model for the seller side of e-commerce — checks whether a return request is safe to approve, or likely abuse (wardrobing, fraudulent claims, or serial returning), before the refund goes out.

Built for Razorpay's AI Buildathon — Track 02: AI Risk Manager.

## The problem

Merchants using Razorpay lose real revenue every time they approve a return that's actually abuse. Every refund flows back out through Razorpay's payment rails as a real cost — not just the product value, but wasted transaction/processing overhead too. Post-purchase abuse (returns/refunds) is a less-covered gap compared to upfront payment fraud.

This tool flags risky returns before the refund is issued, so merchants stop the bleed.

## How it works

A two-stage pipeline:

1. Stage 1 — Binary classifier: Is this return legitimate or abusive? (Random Forest, 93% accuracy)
2. Stage 2 — Type classifier (only runs if flagged abusive): Which type — Wardrobing, Fraudulent Return, or Policy Abuser? (Random Forest, 98% accuracy)

The React frontend collects return details, sends them to a FastAPI backend, which runs both models and returns a risk score, decision, and (if abusive) the likely abuse type.

Tech used : pandas, scikit-learn, joblib · FastAPI, pydantic · React, axios

## Results (held-out test set)

**Stage 1 — Legitimate vs. Abusive**

| Metric | Score |
|---|---|
| Accuracy | 93% |
| Precision (Abusive) | 0.90 |
| Recall (Abusive) | 0.88 |
| False positives | 357 |
| False negatives | 443 |

**Stage 2 — Abuse Type Classification** (on flagged abusive cases)

| Metric | Score |
|---|---|
| Accuracy | 98% |
| Precision | 0.97 – 1.00 |
| Recall | 0.97 – 1.00 |

## False-positive cost

A false positive means a genuine customer's legitimate return gets wrongly flagged — this delays their refund, creates friction, and risks losing that customer's future business. A false negative means real abuse slips through — the merchant pays out a refund that should've been caught, directly costing money.

These trade off against each other through the classification threshold: lowering it catches more fraud but flags more genuine customers; raising it protects genuine customers but lets more abuse through. The default threshold here is 0.5, but a merchant could tune this based on whether protecting revenue or protecting customer trust matters more to their business.

## What broke, and how I fixed it

1. The model  was too good to be true hitting 100% accuracy which basically means model is cheating some feature in the dataset was leaking the answer. Single-feature testing revealed six columns were leaking the answer directly (e.g. `return_rate_pct`, which was likely used to generate the labels themselves). I removed all six and retrained my model and finally got an absolute 93%.

2. now i tried the most basic rule-based type tagging but that couldn't separate overlapping abuse types.I first tried hand-written rules (long return window = wardrobing, invalid tracking = fraud, high order count = policy abuse). Tightening one rule to catch more of one type kept stealing cases from another and after trying hit and trial the  best I got was 67% blended accuracy. These types genuinely overlap in real behavioral data. Trained a second classifier on the abusive subset instead and letting it learn the right feature combinations automatically and accuracy jumped to 98%.


## Roadmap (my future plan)

Image-based verification: sellers photograph items before shipping; if returned, the buyer's photo is compared against the original using CNN-based image similarity (pre-trained embeddings + cosine similarity) to flag visible differences. This is a useful feature as catching cases behavioral data alone can't verify because if theirs a new account with almost no order history and returning after a short window intuitively feels suspicious and this makes sense as model predicts by seeing order history to detects pattern for ex - actual wear or item-swap fraud. This targets a real, current gap: existing fraud tools compare returns against order records, not against a seller's own pre-shipment photo. Not built yet due to time constraints + i cant find any dataset realated to this item wear and tear or defective and also no comparison photo of defective vs non defective pieces . So i found a workaround that ihve tell eariler to compare seller and buyers photo side by side , this approach doesn't require training a custom model from scratch.

## Running locally

(Backend)
```bash
cd backend
python -m venv venv
venv\Scripts\activate       

(Windows)
pip install fastapi uvicorn pandas scikit-learn joblib python-multipart
uvicorn main:app --reload
```

(Frontend)
```bash
cd frontend
npm install
npm run dev
```

 ## Dataset

[E-Commerce Return Abuse Detection Dataset](https://www.kaggle.com/datasets/sarveshchhetri/e-commerce-return-abuse-detection-dataset) (Kaggle) — 60,000 synthetic return transactions, 35 features.
