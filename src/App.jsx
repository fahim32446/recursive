import React, { useState } from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, verticalChildren: [], color: getRandomColor() },
  ]);

  const handleVertical = (id) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id
          ? {
              ...box,
              verticalChildren: [
                ...box.verticalChildren,
                {
                  id: box.verticalChildren.length + 1,
                  direction: 'vertical',
                  horizontalChildren: [],
                  color: getRandomColor(),
                },
              ],
            }
          : box
      )
    );
  };

  const handleHorizontal = () => {
    setBoxes((prevBoxes) => [
      ...prevBoxes,
      {
        id: prevBoxes.length + 1,
        verticalChildren: [],
        color: getRandomColor(),
      },
    ]);
  };

  const handleHorizontalChild = (mainId, verticalChildId) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === mainId
          ? {
              ...box,
              verticalChildren: box.verticalChildren.map((child) =>
                child.id === verticalChildId
                  ? {
                      ...child,
                      horizontalChildren: [
                        ...child.horizontalChildren,
                        {
                          id: child.horizontalChildren.length + 1,
                          direction: 'horizontal',
                          color: getRandomColor(),
                        },
                      ],
                    }
                  : child
              ),
            }
          : box
      )
    );
  };

  const removeVertical = (mainId, verticalChildId) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === mainId
          ? {
              ...box,
              verticalChildren: box.verticalChildren.filter(
                (child) => child.id !== verticalChildId
              ),
            }
          : box
      )
    );
  };

  const removeHorizontal = (id) => {
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
  };

  const removeHorizontalChild = (
    mainId,
    verticalChildId,
    horizontalChildId
  ) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === mainId
          ? {
              ...box,
              verticalChildren: box.verticalChildren.map((child) =>
                child.id === verticalChildId
                  ? {
                      ...child,
                      horizontalChildren: child.horizontalChildren.filter(
                        (hChild) => hChild.id !== horizontalChildId
                      ),
                    }
                  : child
              ),
            }
          : box
      )
    );
  };

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle}>
      {boxes.map((box) => (
        <div
          key={box.id}
          style={{
            height: '50vh',
            border: '1px solid black',
            marginBottom: '10px',
            background: box.color,
          }}
          className='flex p-1 justify-center items-center'
        >
          {box.verticalChildren.length > 0 ? (
            box.verticalChildren.map((vChild) => (
              <div
                key={vChild.id}
                style={{
                  height: '100%',
                  border: '1px solid black',
                  marginBottom: '10px',
                }}
                className='h-full w-full overflow-auto'
              >
                {vChild.horizontalChildren.length > 0 ? (
                  vChild.horizontalChildren.map((hChild) => (
                    <div
                      style={{ background: hChild.color }}
                      key={hChild.id}
                      className='bg-state-500 h-fit py-10 w-full flex flex-row border justify-center items-center'
                    >
                      <div>
                        <div className='flex gap-3'>
                          <button
                            onClick={() => handleVertical(box.id)}
                            className='px-3 border rounded'
                          >
                            V
                          </button>
                          <button
                            onClick={() =>
                              handleHorizontalChild(box.id, vChild.id)
                            }
                            className='px-3 border rounded'
                          >
                            H
                          </button>
                          <button
                            onClick={() =>
                              removeHorizontalChild(
                                box.id,
                                vChild.id,
                                hChild.id
                              )
                            }
                            className='px-3 border rounded bg-red-500 text-white'
                          >
                            Remove H
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{ background: vChild.color }}
                    className='bg-state-500 h-full w-full flex border justify-center items-center'
                  >
                    <div>
                      <div className='flex gap-3'>
                        <button
                          onClick={() => handleVertical(box.id)}
                          className='px-3 border rounded'
                        >
                          V
                        </button>
                        <button
                          onClick={() =>
                            handleHorizontalChild(box.id, vChild.id)
                          }
                          className='px-3 border rounded'
                        >
                          H
                        </button>
                        <button
                          onClick={() => removeVertical(box.id, vChild.id)}
                          className='px-3 border rounded bg-red-500 text-white'
                        >
                          Remove V
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>
              <div className='flex gap-3'>
                <button
                  onClick={() => handleVertical(box.id)}
                  className='px-3 border rounded'
                >
                  V
                </button>
                <button
                  onClick={handleHorizontal}
                  className='px-3 border rounded'
                >
                  H
                </button>
                <button
                  onClick={() => removeHorizontal(box.id)}
                  className='px-3 border rounded bg-red-500 text-white'
                >
                  Remove H
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
