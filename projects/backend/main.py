from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles

app = FastAPI()

def predict_price(area: float, bedrooms: int, location: str) -> float:
    base_price = 500_000_000
    price_area = area * 15_000_000
    price_bedrooms = bedrooms * 50_000_000

    total = base_price + price_area + price_bedrooms

    loc = (location or "other").lower().strip()
    if loc == "hanoi":
        total *= 1.3
    elif loc == "hcmc":
        total *= 1.25
    return float(round(total, -6))


@app.get("/predict")
def predict_endpoint(area: float, bedrooms: int, location: str = "other"):
    predicted_price = predict_price(area, bedrooms, location)
    return {
        "area": area,
        "bedrooms": bedrooms,
        "location": location,
        "predicted_price": predicted_price
    }


@app.post("/predict")
async def predict_endpoint_post(request: Request):
    data = await request.json()
    area = float(data.get("area", 0))
    bedrooms = int(data.get("bedrooms", 0))
    location = str(data.get("location", "other"))

    predicted_price = predict_price(area, bedrooms, location)
    return {
        "area": area,
        "bedrooms": bedrooms,
        "location": location,
        "predicted_price": predicted_price
    }



app.mount("/static", StaticFiles(directory="../frontend"), name="static")
