from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from history.models import PredictionHistory


@api_view(['GET'])
def home(request):
    return Response({
        "message": "PlantGuard AI API is running!",
        "status": "success"
    })


@api_view(['POST'])
def predict(request):

    try:
        temperature = float(request.data.get('temperature'))
        humidity = float(request.data.get('humidity'))
        rainfall = float(request.data.get('rainfall'))
        soil_ph = float(request.data.get('soil_ph'))

    except (TypeError, ValueError):
        return Response(
            {
                "error": "Please provide valid numeric values for temperature, humidity, rainfall and soil_ph."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Disease prediction rules

    if humidity > 80 and rainfall > 100:
        disease = "Late Blight"
        confidence = 85
        treatment = "Apply appropriate fungicide and improve field drainage."
        recovery_time = "7-14 days"
        yield_loss = "20-30%"
        prevention = [
            "Avoid excessive irrigation",
            "Improve air circulation",
            "Remove infected plant parts"
        ]

    elif temperature > 28 and humidity > 70:
        disease = "Early Blight"
        confidence = 80
        treatment = "Apply recommended fungicide and remove infected leaves."
        recovery_time = "5-10 days"
        yield_loss = "10-20%"
        prevention = [
            "Maintain proper plant spacing",
            "Avoid overhead watering",
            "Remove infected leaves"
        ]

    elif soil_ph < 5.5:
        disease = "Bacterial Spot"
        confidence = 75
        treatment = "Maintain suitable soil conditions and follow recommended disease management practices."
        recovery_time = "7-14 days"
        yield_loss = "10-15%"
        prevention = [
            "Maintain proper soil pH",
            "Use healthy planting material",
            "Avoid working with wet plants"
        ]

    else:
        disease = "Healthy"
        confidence = 92
        treatment = "No disease treatment required."
        recovery_time = "Not applicable"
        yield_loss = "0%"
        prevention = [
            "Continue regular monitoring",
            "Maintain proper irrigation",
            "Maintain balanced soil nutrients"
        ]

    # Save prediction to database

    PredictionHistory.objects.create(
        temperature=temperature,
        humidity=humidity,
        rainfall=rainfall,
        soil_ph=soil_ph,
        disease=disease,
        confidence=f"{confidence}%",
        treatment=treatment,
        recovery_time=recovery_time,
        expected_yield_loss=yield_loss
    )

    # Send result to frontend

    return Response({
        "status": "success",

        "input": {
            "temperature": temperature,
            "humidity": humidity,
            "rainfall": rainfall,
            "soil_ph": soil_ph
        },

        "prediction": {
            "disease": disease,
            "confidence": f"{confidence}%",
            "treatment": treatment,
            "recovery_time": recovery_time,
            "expected_yield_loss": yield_loss,
            "prevention_tips": prevention
        }
    })