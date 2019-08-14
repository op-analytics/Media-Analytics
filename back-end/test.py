from app.models.model_functions import loadModels
from threading import Semaphore
import os

print('loading models')
models = loadModels(os.environ['TIMELINE_MODELS_DIR'])
for _,model in models.items():
    model.wv.most_similar('stuff')
print('loaded models')
Semaphore(0).acquire()  # just hang until process killed
