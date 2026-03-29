import sys
from PIL import Image

def remove_white_bg(input_path, output_path, threshold=230):
    try:
        # Open the image and convert to RGBA
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # item is (R, G, B, A)
            # If the pixel is close to white (R,G,B > threshold), make it transparent
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                # White-ish pixel -> Replace with fully transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Successfully processed logo and saved to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # The user's uploaded logo is at ~/Downloads/CAN_YOU_CONVERT_202603291355.png
    input_file = "/Users/shubhdeepsingh/Downloads/CAN_YOU_CONVERT_202603291355.png"
    output_file = "/Users/shubhdeepsingh/Downloads/SITE FOR NEURALWINGS/neuralwings-web/src/assets/logo.png"
    
    remove_white_bg(input_file, output_file)
