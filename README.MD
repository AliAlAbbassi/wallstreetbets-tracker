r/Wallstreetbets Tracker

How to install 
- Create a new Postgresql database and modify the config file in this directory wsb/config.py
- Run the wsb/populate_stocks.py script to populate the db with stocks. Also, make sure to
  get some API for stocks, I recommend Alpaca 
- Run the wsb/search_wsb.py script to fetch reddit posts into the db