import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { AnimatedFAB, Button, Card, Text } from 'react-native-paper'
import CreateTodo from './CreateTodo'

const TaskCard = ({index, deleteTodo, editTodo, text, completed, createdAt }) => {
    return <Card style={{ marginBottom: 10 }}>
        <Card.Content>
            <Text>{createdAt.toDateString()} {createdAt.toLocaleTimeString()}</Text>
            <Text>{text}</Text>
        </Card.Content>
        <Card.Actions>
            <Button icon={'pencil'} onPress={()=> editTodo(index)}>Edit</Button>
            <Button icon={'delete'} onPress={()=> deleteTodo(index)}>Delete</Button>
        </Card.Actions>
    </Card>
}



const ListTodo = () => {

    const [taskList, setTaskList] = useState([]);

    const [showTodoForm, setShowTodoForm] = useState(false);

    const displayList = () => {
        return <ScrollView style={styles.scrollContent}>
            {
                taskList.map((task, index) => {
                    return (
                        <Card key={index} style={{ marginBottom: 10 }}>
                            <Card.Content>
                                <Text>{task.text}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button icon={'pencil'}>Edit</Button>
                                <Button icon={'delete'}>Delete</Button>
                            </Card.Actions>
                        </Card>
                    )
                })
            }
        </ScrollView>
    }
    const deleteTodo = (index)=>{
        setTaskList(...taskList.filter((task, i) => i !== index));
    }
    const editTodo = (index)=>{
        
    }

    return (
        <View style={styles.container}>

            <AnimatedFAB 
                icon={'plus'}
                label='Add Task'
                style={styles.fab}
                extended={true}
                onPress={() => setShowTodoForm(true)}
            />
            <CreateTodo editTodo={editTodo} visible={showTodoForm} setVisible={setShowTodoForm} taskList={taskList} setTaskList={setTaskList} />
            <View style={styles.header}>
                <Text variant='headlineMedium' style={styles.title}>List Todo</Text>
            </View>
            <View style={styles.content}>
                {/* {displayList()} */}
                <FlatList 
                    data={taskList}
                    renderItem={({ item,index }) => <TaskCard {...item} index={index} deleteTodo={deleteTodo} editTodo={editTodo} />}
                    keyExtractor={(item, index) => {return index}}
                    ListEmptyComponent={()=> <Text style={{fontSize:30, fontWeight:'bold',color:'#999',textAlign:'center',marginTop:40}}>No Task Available</Text>}
                />
            </View>
        </View>
    )
}

export default ListTodo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flex: 1,
        backgroundColor: 'blue',
    },
    content: {
        flex: 5,
        gap: 10,
    },
    scrollContent: {
        padding: 10,
    },
    fab:{
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 10,
    },
    title: {
        textAlign: 'center',
        marginVertical: 20
    },
})