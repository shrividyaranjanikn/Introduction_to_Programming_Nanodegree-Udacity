import fresh_tomatoes
import media

fallen = media.Movie("Fallen",
                     "A story about fallen angels",
                     "https://upload.wikimedia.org/wikipedia/en/3/34/Fallen_Poster_Theatrical.jpeg",
                     "https://www.youtube.com/watch?v=cJkFWfCD3YM")
avatar = media.Movie("Avatar",
                     "Strange story",
                     "https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg",
                     "https://www.youtube.com/watch?v=5PSNL1qE6VY")
zootopia = media.Movie("Zootopia",
                       "World of animals",
                       "https://upload.wikimedia.org/wikipedia/en/e/ea/Zootopia.jpg",
                       "https://www.youtube.com/watch?v=CzvH6_e2a-U")
conjuring= media.Movie("Conjuring2",
                     "Horror",
                     "https://upload.wikimedia.org/wikipedia/en/b/b9/Conjuring_2.jpg",
                     "https://www.youtube.com/watch?v=VFsmuRPClr4")
tomorrow = media.Movie("The Day After Tomorrow",
                       "Dad saving his child",
                       "https://upload.wikimedia.org/wikipedia/en/5/58/The_Day_After_Tomorrow_movie.jpg",
                       "https://www.youtube.com/watch?v=Ku_IseK3xTc")
dory = media.Movie("Finding Dory",
                   "Adventure in finding Dory",
                   "https://upload.wikimedia.org/wikipedia/en/3/3e/Finding_Dory.jpg",
                   "https://www.youtube.com/watch?v=JhvrQeY3doI")

movie = [fallen, avatar, zootopia, conjuring, tomorrow, dory]#movie names
fresh_tomatoes.open_movies_page(movie)
