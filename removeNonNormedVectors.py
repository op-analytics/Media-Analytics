from gensim.models import Word2Vec
import os
path = os.environ['TIMELINE_MODELS_DIR']
for file in os.listdir(path):
    if file.lower().endswith(('.npy', '.md', '-example')) or os.path.isdir(path+str(file)) or file.startswith('.'):
        continue
    try:
        model = Word2Vec.load('./Media-Analytics-Models/'+file)
        model.init_sims(replace=True)
        model.save('./reducedModels/'+file)
    except Exception as e:
        raise e
