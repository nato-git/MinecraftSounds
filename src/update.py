import json
import requests

def check_sound():
  raw_url = "https://raw.githubusercontent.com/Mojang/bedrock-samples/main/resource_pack/sounds/sound_definitions.json"
  response = requests.get(raw_url)
  response.raise_for_status()
  try:
    sound_data = response.json()
    with open("src/sounds.json", "w", encoding="utf-8") as f:
      json.dump(sound_data, f, ensure_ascii=False, indent=4)
  except json.JSONDecodeError:
    pass

check_sound()
