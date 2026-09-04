import torch, torchvision.models as models, torchvision.transforms as T
from PIL import Image
import torch.nn.functional as F

model = models.resnet18(pretrained=True)
model.fc = torch.nn.Identity()
model.eval()

transform = T.Compose([
    T.Resize((224,224)), T.ToTensor(),
    T.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225])
])

def get_embedding(path):
    img = Image.open(path).convert("RGB")
    tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        return model(tensor)

def compare(before_path, after_path):
    e1 = get_embedding(before_path)
    e2 = get_embedding(after_path)
    sim = F.cosine_similarity(e1, e2).item()
    print(f"{before_path} vs {after_path}: similarity = {sim:.3f}")
    return sim

if __name__ == "__main__":
    compare("../photo-verification-demo/before/item1_before.jpg", "../photo-verification-demo/after/item1_after.jpg")
    compare("../photo-verification-demo/before/item2_before.jpg", "../photo-verification-demo/after/item2_after.jpg")
    compare("../photo-verification-demo/before/item3_before.jpg", "../photo-verification-demo/after/item3_after.jpg")
    compare("../photo-verification-demo/before/item4_before.jpg", "../photo-verification-demo/after/item4_after.jpg")