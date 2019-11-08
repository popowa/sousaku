from PIL import Image
import sys
import pyocr
import pyocr.builders

tools = pyocr.get_available_tools()
if len(tools) == 0:
    print("No OCR tool found")
    sys.exit(1)
# The tools are returned in the recommended order of usage
tool = tools[0]
"""
txt = tool.image_to_string(
    Image.open('sample.jpg'),
    lang="jpn+eng",
    builder=pyocr.builders.TextBuilder(tesseract_layout=6)
)
"""
txt = tool.image_to_string(
    Image.open('sample.jpg'),
    lang="eng",
    builder=pyocr.builders.WordBoxBuilder()
)

print(txt)
