import { FlatList, Keyboard, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { AnimatedFAB, Appbar, Button, Card, Checkbox, Divider, IconButton, Menu, Provider, Snackbar, Text, TextInput } from 'react-native-paper'
import CreateTodo from './CreateTodo'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TaskCard = ({ index, isEditing, setIsEditing, taskList, setTaskList, deleteTodo, editTodo, text, completed, createdAt }) => {
    // const updatedTask = (index,text) => {
    //     console.log(text);
    // }    
    const [editMode, setEditMode] = useState(false);
    const [userInput, setUserInput] = useState(text);

    const updateTask = () => {
        const temp = taskList;
        temp[index].text = userInput;
        setTaskList([...temp]);
        Keyboard.dismiss();
        setEditMode(false);
    }

    const toggleTask = () => {
        const temp = taskList;
        temp[index].completed = !temp[index].completed;
        setTaskList([...temp]);
    }

    return <Card style={{ marginBottom: 10, backgroundColor: completed ? 'lightgreen' : 'white' }}>
        <Card.Content>
            <Text>{createdAt.toDateString()} {createdAt.toLocaleTimeString()}</Text>
            <Checkbox status={completed ? 'checked' : 'unchecked'} onPress={toggleTask} />
            {/* <Text style={{fontSize:30}}>{text}</Text> */}
            <View style={styles.taskContainer}>
                {/* { isEditing && isEditing.status && isEditing.index === index ? <TextInput value={text} onChangeText={()=>{updatedTask(index,text)}} /> : <Text style={{fontSize:24}}>{text}</Text>} */}
                {
                    editMode ? (
                        <TextInput value={userInput} onChangeText={setUserInput} />
                    ) : (
                        <Text style={{ fontSize: 24 }}>{text}</Text>
                    )
                }
            </View>
        </Card.Content>
        <Card.Actions>
            {/* {
                isEditing && isEditing.status  && isEditing.index === index ? <Button icon={'content-save'} onPress={()=> setIsEditing(false)}>Save</Button> : <Button icon={'pencil'} onPress={()=> editTodo(index)}>Edit</Button>
            } */}
            <Button icon={'pencil'} onPress={() => { editMode ? updateTask() : setEditMode(true) }} >{editMode ? 'Update' : 'Edit'}</Button>
            <Button icon={'delete'} onPress={() => deleteTodo(index)}>Delete</Button>
        </Card.Actions>
    </Card>
}



const ListTodo = () => {

    const [taskList, setTaskList] = useState([]);
    const [showTodoForm, setShowTodoForm] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
    const [showFeedback, setShowFeedback] = useState(false);

    // const [isEditing, setIsEditing] = useState({
    //     status: false,
    //     index: null
    // });

    // console.log(taskList);

    // const displayList = () => {
    //     return <ScrollView style={styles.scrollContent}>
    //         {
    //             taskList.map((task, index) => {
    //                 return (
    //                     <Card key={index} style={{ marginBottom: 10 }}>
    //                         <Card.Content>
    //                             <Text>{task.text}</Text>
    //                         </Card.Content>
    //                         <Card.Actions>
    //                             <Button icon={'pencil'}>Edit</Button>
    //                             <Button icon={'delete'}>Delete</Button>
    //                         </Card.Actions>
    //                     </Card>
    //                 )
    //             })
    //         }
    //     </ScrollView>
    // }
    const handleMenuPress = (event) => {
        const { nativeEvent } = event;
        console.log(nativeEvent);
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY - 20
        };

        setMenuAnchor(anchor);
        setMenuVisible(true);
    }

    const deleteTodo = (index) => {
        setTaskList(taskList.filter((task, i) => i !== index));
    }
    const editTodo = (index) => {
        console.log(index);
        console.log(isEditing);
        setIsEditing({
            status: !isEditing.status,
            index: index
        });
    }

    const sortAtoZ = () => {
        const temp = taskList;
        temp.sort((a, b) => a.text.localeCompare(b.text));
        setTaskList([...temp]);
        setShowFeedback(true);
        setMenuVisible(false);
    }
    const sortCompleted = () => {
        const temp = taskList;
        temp.sort((a, b) => a.completed - b.completed);
        setTaskList([...temp]);
        setShowFeedback(true);
        setMenuVisible(false);
    }
    const sortDate = () => {
        const temp = taskList;
        temp.sort((a, b) => b.createdAt - a.createdAt);
        setTaskList([...temp]);
        setShowFeedback(true);
        setMenuVisible(false);
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
            <Appbar.Header style={{backgroundColor:'crimson'}}>
                <Appbar.Content title="Todo" color='#fff' />
                {/* <Appbar.Action icon="magnify" onPress={()=>{}} /> */}
                <Appbar.Action icon="dots-vertical" color='#fff' onPress={handleMenuPress} />
            </Appbar.Header>
            <Snackbar
                visible={showFeedback}
                onDismiss={() => { setShowFeedback(false) }}
                duration={1000}
                action={{
                    label: 'Ok',
                    onPress: () => {
                        setShowFeedback(false);
                    }
                }}>
                Task Sorted
            </Snackbar>
            <CreateTodo editTodo={editTodo} visible={showTodoForm} setVisible={setShowTodoForm} taskList={taskList} setTaskList={setTaskList} />
            <View style={styles.header}>
                {/* <IconButton iconColor='white' onPress={handleMenuPress} style={styles.menuIcon} icon='dots-vertical' /> */}
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={menuAnchor}
                >
                    <Menu.Item leadingIcon={'sort'} onPress={sortAtoZ} title="Sort A-Z" />
                    <Menu.Item leadingIcon={'sort-bool-ascending-variant'} onPress={sortCompleted} title="Sort by Completed" />
                    <Divider />
                    <Menu.Item leadingIcon={'sort-calendar-ascending'} onPress={sortDate} title="Sort by Date" />
                </Menu>
                <Text style={styles.title}>List Todo</Text>
            </View>
            <View style={styles.content}>
                {/* {displayList()} */}
                <FlatList
                    data={taskList}
                    renderItem={({ item, index }) => <TaskCard {...item} taskList={taskList} setTaskList={setTaskList} index={index} deleteTodo={deleteTodo} editTodo={editTodo} />}
                    keyExtractor={(item, index) => { return index }}
                    ListEmptyComponent={() => <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#999', textAlign: 'center', marginTop: 40 }}>No Task Available</Text>}
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
        flex: 0.6,
        justifyContent: 'center',
        backgroundColor: 'crimson',
    },
    content: {
        flex: 5,
        gap: 10,
    },
    scrollContent: {
        padding: 10,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 10,
    },
    title: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
    },
    menuIcon: {
        // position: 'absolute',
        right: 0,
        top: 10,
        color: 'white',
    },
})