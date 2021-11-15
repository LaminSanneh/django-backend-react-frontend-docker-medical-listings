from django.db.models import fields
from rest_framework import serializers

from .models import Molecule, Activity, Target

class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = "__all__"

class ActivitySerializer(serializers.ModelSerializer):
    target = TargetSerializer(many=False)
    
    class Meta:
        model = Activity
        fields = '__all__'

class MoleculeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Molecule
        fields = "__all__"

class MoleculeDetailSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True)

    class Meta:
        model = Molecule
        fields = "__all__"