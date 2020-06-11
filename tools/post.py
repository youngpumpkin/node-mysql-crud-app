import requests
from requests_toolbelt.multipart.encoder import MultipartEncoder

mp_encoder = MultipartEncoder(
        fields={
        'foo': 'bar',
        # plain file object, no filename or mime type produces a
        # Content-Disposition header with just the part name
        'spam': ('spam.txt', open('spam.txt', 'rb'), 'text/plain'),
        }
        )
r = requests.post(
        'http://192.168.66.163/post',
        data=mp_encoder,  # The MultipartEncoder is posted as data, don't use files=...!
        # The MultipartEncoder provides the content-type header with the boundary:
        headers={'Content-Type': mp_encoder.content_type}
        )

