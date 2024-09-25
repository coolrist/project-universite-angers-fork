from django.shortcuts import render
from .. import utils

# Create your views here.
def home(request):
    return render(request, "homepage.html")
