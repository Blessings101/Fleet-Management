
from django.db import models

class Vehicle(models.Model):
    plate_number = models.CharField(max_length=20, unique=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.PositiveIntegerField()

    def __str__(self):
        return self.plate_number

class Location(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.vehicle.plate_number} - {self.timestamp}'
    
    class driver(models.Model):
        Driver_name = models.CharField(max_length=30,unique=True)
        Driver_ID = models.CharField(max_length=20)

        def __str__(self) :
            return self.Driver_name
