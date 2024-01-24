from .serializers import TodoSerializer, Todo
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status


@api_view(["GET", "POST"])
def todo_list(request):
    if request.method == "GET":
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(data=serializer.data, status=201)
    elif request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_207_MULTI_STATUS, data=serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)


@api_view(["GET", "PUT", "DELETE"])
def todo_item(request, pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response(data={"Status": f"{pk} is invalid Todo ID"}, status=400)

    if request.method == "GET":
        serializer = TodoSerializer(todo)
        return Response(data=serializer.data, status=201)
    elif request.method == "PUT":
        # data = JSONParser().parse(request)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        return Response(data=serializer.errors, status=400)
    elif request.method == "DELETE":
        todo.delete()
        return Response(data={"status" : f"Todo with {pk} is deleted successfully"})



