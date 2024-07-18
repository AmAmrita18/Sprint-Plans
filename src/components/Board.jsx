import React, { useState, useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

import {
  FaPlus,
  FaEllipsisV,
  FaComment,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoard = ({ title }) => {
  const [tasks, setTasks] = useState({
    Backlog: [],
    "In Discussion": [],
    "In Progress": [],
    Done: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    subheading: "",
    description: "",
    bannerImage: "",
    avatar: "",
    subtasks: [],
    dueDate: "",
    tags: "",
  });
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      const taskToAdd = {
        id: Date.now(),
        ...newTask,
        tags: newTask.tags.split(",").map((tag) => tag.trim()),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
      };
      setTasks((prevTasks) => ({
        ...prevTasks,
        [currentCategory]: [...prevTasks[currentCategory], taskToAdd],
      }));
      setNewTask({
        title: "",
        subheading: "",
        description: "",
        bannerImage: "",
        avatar: "",
        subtasks: [],
        dueDate: "",
        tags: "",
      });
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddSubtask = () => {
    setNewTask((prevTask) => ({
      ...prevTask,
      subtasks: [
        ...prevTask.subtasks,
        { id: Date.now(), text: "", completed: false },
      ],
    }));
  };

  const handleSubtaskChange = (id, text) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, text } : subtask
      ),
    }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destCategory = destination.droppableId;

    if (sourceCategory !== destCategory) {
      const sourceTasks = Array.from(tasks[sourceCategory]);
      const destTasks = Array.from(tasks[destCategory]);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [sourceCategory]: sourceTasks,
        [destCategory]: destTasks,
      });
    } else {
      const taskList = Array.from(tasks[sourceCategory]);
      const [removed] = taskList.splice(source.index, 1);
      taskList.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [sourceCategory]: taskList,
      });
    }
  };

  const handleDeleteTask = (category, taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].filter((task) => task.id !== taskId),
    }));
  };

  const handleToggleSubtask = (category, taskId, subtaskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      ),
    }));
  };

  const handleRemoveSubtask = (category, taskId, subtaskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(
                (subtask) => subtask.id !== subtaskId
              ),
            }
          : task
      ),
    }));
  };

  const handleClearAllTasks = (category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [],
    }));
  };
  return (
    <div className="py-4 lg:px-12 md:px-10 px-4 relative">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="overflow-x-auto pb-4">
          <div
            className="flex flex-nowrap space-x-4"
            style={{ minWidth: "max-content" }}
          >
            {Object.keys(tasks).map((category) => (
              <Droppable droppableId={category} key={category}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-100 p-4 rounded w-80 flex-shrink-0"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-bold">{category}</h2>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setCurrentCategory(category);
                            setIsModalOpen(true);
                          }}
                          className="text-gray-400 hover:text-gray-700"
                        >
                          <FaPlus />
                        </button>
                        <div className="relative group">
                          <button className="text-gray-400 hover:text-gray-700 flex items-center">
                            <FaEllipsisV />
                          </button>
                          <div className="absolute right-0 w-48 bg-gray-300 rounded-md shadow-lg z-10 hidden group-hover:block">
                            <button
                              onClick={() => handleClearAllTasks(category)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              Clear All Tasks
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {tasks[category].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onDelete={() =>
                                  handleDeleteTask(category, task.id)
                                }
                                onToggleSubtask={(subtaskId) =>
                                  handleToggleSubtask(
                                    category,
                                    task.id,
                                    subtaskId
                                  )
                                }
                                onRemoveSubtask={(subtaskId) =>
                                  handleRemoveSubtask(
                                    category,
                                    task.id,
                                    subtaskId
                                  )
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-32 mx-auto p-5 border w-[40%] shadow-xl rounded-md bg-white bg-opacity-90">
            <div className="  text-center">
              <h3 className="text-[23px] font-[800] text-[#4b5563] mb-3">
                Add Task : {currentCategory}
              </h3>
              <form onSubmit={handleAddTask} className="mt-2 text-left">
                <div className="flex gap-x-4">
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Task Title"
                    className="w-full p-2 border rounded mb-2 bg-gray-300 bg-opacity-70"
                  />
                </div>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  placeholder="Task Description"
                  className="w-full p-2 border rounded resize-none mb-[2px] bg-gray-300 bg-opacity-70"
                />
                <input
                  type="text"
                  name="bannerImage"
                  value={newTask.bannerImage}
                  onChange={handleInputChange}
                  placeholder="Banner Image URL"
                  className="w-full p-2 border rounded mb-2 bg-gray-300 bg-opacity-70"
                />
                <input
                  type="text"
                  name="avatar"
                  value={newTask.avatar}
                  onChange={handleInputChange}
                  placeholder="Avatar URL"
                  className="w-full p-2 border rounded mb-2 bg-gray-300 bg-opacity-70"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-2 bg-gray-300 bg-opacity-70"
                />
                <input
                  type="text"
                  name="tags"
                  value={newTask.tags}
                  onChange={handleInputChange}
                  placeholder="Tags (comma-separated)"
                  className="w-full p-2 border rounded mb-2 bg-gray-300 bg-opacity-70"
                />
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={handleAddSubtask}
                    className="bg-[#a3e635] text-gray-800 px-3 font-[600] py-1 rounded"
                  >
                    Add Subtask
                  </button>
                </div>
                {newTask.subtasks.map((subtask, index) => (
                  <input
                    key={subtask.id}
                    type="text"
                    value={subtask.text}
                    onChange={(e) =>
                      handleSubtaskChange(subtask.id, e.target.value)
                    }
                    placeholder={`Subtask ${index + 1}`}
                    className="w-full p-2 border rounded mb-2 bg-gray-300 bg-opacity-70"
                  />
                ))}
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-white mr-2 bg-[#f87171] font-[600] p-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#a3e635] text-black font-[600] px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TaskCard = ({ task, onDelete, onToggleSubtask, onRemoveSubtask }) => {
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {task.bannerImage && (
        <div
          className="h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${task.bannerImage})` }}
        >
          <div className="h-full w-full bg-black bg-opacity-30 flex items-end">
            <h2 className="text-white text-xl font-bold p-4">{}</h2>
          </div>
        </div>
      )}

      <div className="p-4">
        {!task.bannerImage && (
          <h2 className="text-xl font-[600] mb-2"> {task.title}</h2>
        )}

        <div className="flex flex-row gap-4">
          <div className="w-[80px] border-t-[6px] mb-2 border-[#a3e635]"></div>
          <div className="w-[80px] border-t-[6px] mb-2 border-[#f87171]"></div>
        </div>
        <h3 className="text-gray-600 mb-2 flex text-xl font-[600] items-center">
          <FaRegCheckCircle className="mr-2" />
          {task.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">{task.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs text-white ${getRandomColor()}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center">
            {task.avatar && (
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={task.avatar}
                alt="Avatar"
              />
            )}
            <span className="text-sm text-gray-500">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex space-x-2 ">
            <button className="flex items-center text-gray-500 hover:text-blue-500">
              <AiFillLike className="mr-1" /> {task.likes}
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500">
              <FaComment className="mr-1" /> {task.comments}
            </button>
          </div>
        </div>

        {task.subtasks.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-2">
              {task.subtasks.map((subtask) => (
                <li key={subtask.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => onToggleSubtask(subtask.id)}
                    className="mr-2"
                  />
                  <span
                    className={
                      subtask.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {subtask.text}
                  </span>
                  <button
                    onClick={() => onRemoveSubtask(subtask.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end items-center">
          <div className="flex space-x-2">
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskBoard;
