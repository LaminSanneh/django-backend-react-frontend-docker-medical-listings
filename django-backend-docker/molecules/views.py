from .models import Activity, Molecule
from rest_framework import generics
from django.views.generic.detail import DetailView
from .models import Molecule
from .serializers import MoleculeListSerializer, MoleculeDetailSerializer, ActivitySerializer

class ModeculeAPIListView(generics.ListAPIView):
    queryset = Molecule.objects.all()
    serializer_class = MoleculeListSerializer

class ModeculeAPIDetailsView(generics.RetrieveAPIView):
    queryset = Molecule.objects.all()
    serializer_class = MoleculeDetailSerializer

class ModeculeActivitiesView(generics.ListAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def filter_queryset(self, queryset):
        query_set = super().filter_queryset(queryset).filter(molecule_id=self.kwargs['molecule_id'])
        return query_set
