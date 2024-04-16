import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <div>

        </div>
      </div>
    </>
  );
}

export default Counter;
