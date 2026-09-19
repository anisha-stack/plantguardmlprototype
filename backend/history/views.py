from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import PredictionHistory


@api_view(['GET'])
def prediction_history(request):

    history = PredictionHistory.objects.all().order_by('-created_at')

    data = []

    for item in history:
        data.append({
            "id": item.id,
            "temperature": item.temperature,
            "humidity": item.humidity,
            "rainfall": item.rainfall,
            "soil_ph": item.soil_ph,
            "disease": item.disease,
            "confidence": item.confidence,
            "treatment": item.treatment,
            "recovery_time": item.recovery_time,
            "expected_yield_loss": item.expected_yield_loss,
            "created_at": item.created_at.strftime("%d-%m-%Y %H:%M")
        })

    return Response({
        "status": "success",
        "count": len(data),
        "history": data
    })