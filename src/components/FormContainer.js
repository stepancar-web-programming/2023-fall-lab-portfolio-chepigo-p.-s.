import "./FormContainer.css";

export default ({ handleChange, post }) => {
  return (
    <div className="row-2">
      <div className="input-param-body">
        <div className="input-param-text">Модель</div>
        <select className="input-param-dropdown" onChange={handleChange} name="model_id" value={post.model_id}>
          <option value="0">Художественная</option>
          <option value="1">Реалистичная</option>
          <option value="2">Творческая</option>
          <option value="3">Специальная</option>
        </select>
      </div>
      <div className="input-param-body">
        <div className="input-param-text">Разрешение</div>
        <select className="input-param-dropdown" onChange={handleChange} name="size_id" value={post.size_id}>
          <option value="0">512x512</option>
          <option value="1">768x512</option>
          <option value="2">512x768</option>
        </select>
      </div>
      <div className="input-param-body">
        <div className="input-param-text">Seed</div>
        <input
          className="input-param-value"
          placeholder="random seed number"
          name="seed"
          onChange={handleChange}
          value={post.seed}
        />
      </div>
      <div className="input-param-body">
        <div className="input-param-text">Сила</div>
        <select className="input-param-dropdown" onChange={handleChange} name="strength_id" value={post.strength_id}>
          <option value="0">10%</option>
          <option value="1">25%</option>
          <option value="2">50%</option>
          <option value="3">75%</option>
          <option value="4">100%</option>
        </select>
      </div>
      <div className="input-param-body">
        <div className="input-param-text">Смешиватель</div>
        <select className="input-param-dropdown" onChange={handleChange} name="scheduler_id" value={post.scheduler_id}>
          <option value="0">Стандартный</option>
          <option value="1">Модифицированный</option>
          <option value="2">Художественный</option>
          <option value="3">Специальный</option>
        </select>
      </div>
      <div className="input-param-body">
        <div className="input-param-text">Шаги</div>
        <select className="input-param-dropdown" onChange={handleChange} name="step_id" value={post.step_id}>
          <option value="0">стандартно 20</option>
          <option value="1">30</option>
          <option value="2">40</option>
          <option value="3">50</option>
        </select>
      </div>
      <div className="input-param-body">
        <div className="input-param-text">Количество</div>
        <select className="input-param-dropdown" onChange={handleChange} name="count" value={post.count}>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};
