lsof -i :5000 | grep node | awk '{print $2}' | xargs kill -9
