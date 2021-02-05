import webbrowser

class Movie():
#Creation of a class named movie
    def __init__(self, movie_title, movie_storyline, poster_image, trailer_youtube):
    '''initialise the properties of an instance '''
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = poster_image
        self.trailer_youtube_url = trailer_youtube

    def show_trailer(self):
    '''show_trailer() opens the youtube trailer page'''
        webbrowser.open(self.trailer_youtube_url)
        
