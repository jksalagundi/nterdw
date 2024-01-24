from todos.models import Todo
from rest_framework.serializers import ModelSerializer


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'todo_text', 'completed']

    def create(self, validated_data):
        return Todo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.todo_text = validated_data.get('todo_text', instance.todo_text)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.save()
        return instance
