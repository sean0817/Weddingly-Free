import React, { useState } from "react";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    if (!form) {
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      attendance: formData.get("attendance"),
      guests: attendance === "Hadir" ? formData.get("guests") : 0,
      message: formData.get("message"),
    };

    if (!data.name || !data.attendance || (attendance === "Hadir" && !data.guests)) {
      alert("请填写姓名和出席状态！");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Reset the form if submission is successful
      form.reset();
      setAttendance("");
      alert("收到啦！谢谢！");
    } else {
      alert("提交好像出了点小状况，请稍后再试一次哦~");
    }

    setLoading(false); // Set loading to false after response
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {/* Form fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          姓名
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full p-2 mt-1 bg-white/10 text-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="attendance"
          className="block text-sm font-medium text-white"
        >
          是否出席
        </label>
        <select
          id="attendance"
          name="attendance"
          className="block w-full p-2 mt-1 bg-black/40 text-white border border-gray-300 rounded-md shadow-sm  sm:text-sm"
          required
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        >
          <option value="">请选择</option>
          <option value="Hadir">我/我们会准时出席，非常期待！</option>
          <option value="Tidak Hadir">很遗憾无法到场，祝新婚快乐！</option>
        </select>
      </div>

      {attendance === "Hadir" && (
        <div>
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-white"
          >
            出席人数
          </label>
          <select
            id="guests"
            name="guests"
            className="block w-full p-2 mt-1  bg-black/40 text-white border border-gray-300 rounded-md shadow-sm  sm:text-sm"
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-white"
        >
          留言
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="block w-full p-2 mt-1 bg-white/10 text-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="block w-full p-2 text-sm font-medium text-center text-black bg-white border border-transparent rounded-md shadow-sm"
          disabled={loading}
        >
          {loading ? "提交中..." : "提交"}
        </button>
      </div>
    </form>
  );
};

export default Form;