from python_graphql_client import GraphqlClient
import time

client = GraphqlClient(
    endpoint="http://frozen-plateau-06813.herokuapp.com/graphql")

SAMPLES = 10

def test_get_users():
    query = """
        query{
            users {
                id
                username
                email
                enrollmentDate
                posts{
                    id
                    title
                    body
                }
            }
        }
    """
    variables = {}
    total_time = 0
    for i in range(0, SAMPLES):
        start = time.time()
        client.execute(query=query, variables=variables)
        end = time.time()
        total_time += (end-start)
    print('Tiempo promedio: ' + str(total_time/SAMPLES))
test_get_users()