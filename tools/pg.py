#Import the python driver for PostgreSQL
import psycopg2


#Create a connection credentials to the PostgreSQL database
try:
    connection = psycopg2.connect(
            user = "postgres",
            password = "qwe123",
            host = "localhost",
            port = "5432",
            database = "socka"
            )

    #Create a cursor connection object to a PostgreSQL instance and print the connection properties.
    cursor = connection.cursor()
    print(connection.get_dsn_parameters(),"\n")
   
    cursor.execute("SELECT * from players")

    records = cursor.fetchall()

    for row in records:
        print("first-name : %s" % row[1])
        print("last-name : %s" % row[2])

#Handle the error throws by the command that is useful when using python while working with PostgreSQL
except(Exception, psycopg2.Error) as error:
    print("Error connecting to PostgreSQL database", error)
    connection = None

#Close the database connection
finally:
    if(connection != None):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is now closed")
