from django.db import models


class PredictionHistory(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField()
    rainfall = models.FloatField()
    soil_ph = models.FloatField()

    disease = models.CharField(max_length=100)
    confidence = models.CharField(max_length=20)

    treatment = models.TextField()

    recovery_time = models.CharField(max_length=50)

    expected_yield_loss = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.disease} - {self.created_at}"
    