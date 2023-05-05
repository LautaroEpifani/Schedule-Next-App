const TaskOnCalendar = ({ title, label }) => {
  return (
    <div
      className={`text-white bg-${label}-400 rounded-lg mb-1 mx-auto w-11/12 truncate cursor-pointer text-center`}
    >
      {title}
    </div>
  );
};

export default TaskOnCalendar;
