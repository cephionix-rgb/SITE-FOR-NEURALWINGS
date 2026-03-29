from PIL import Image
import sys

def remove_bg():
    input_path = "/Users/shubhdeepsingh/Downloads/Web_Photo_Editor (1).png"
    output_path = "/Users/shubhdeepsingh/Downloads/SITE FOR NEURALWINGS/neuralwings-web/src/assets/logo.png"
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    # We strip white/light backgrounds. If the logo is dark/blue, threshold 240 is safe.
    for item in data:
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Logo processed with alpha transparency.")

if __name__ == "__main__":
    remove_bg()
