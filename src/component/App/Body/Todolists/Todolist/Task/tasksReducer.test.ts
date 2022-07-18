import {TaskPriorities, TaskStatuses} from '../../../../../../api/api'
import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from './tasksReducer'
import {addTodoListAC, removeTodoListAC} from '../../todoListsReducer'

let startState: TasksStateType

beforeEach(() => (
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            }
        ]
    }))

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({todoListId: 'todolistId2', taskId: '2'})
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        task: {
            id: '4',
            title: 'juice',
            status: TaskStatuses.New,
            todoListId: 'todolistId2',
            completed: false,
            deadline: '',
            order: 1,
            addedDate: '',
            startDate: '',
            priority: TaskPriorities.Low,
            description: ''
        }
    })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC({todoListId: 'todolistId2', taskId: '2', model: {status: TaskStatuses.New}})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
    const action = updateTaskAC({todoListId: 'todolistId2', taskId: '2', model: {title: 'NewTitle'}})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][1].title).toBe('NewTitle')
})

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC({todoList: {id: 'id', addedDate: '', order: 0, title: 'New'}})
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC({todoListId: 'todolistId2'})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})





