import { useState } from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const [box, setBox] = useState([
    { id: 1, verticalChild: [], color: getRandomColor() },
  ]);
  const handleVertical = (id) => {
    setBox((prevBoxes) => {
      const updatedBoxes = prevBoxes.map((box) => {
        if (box.id === id) {
          const nextSerial = box.verticalChild?.length + 1;
          return {
            ...box,
            verticalChild: [
              ...box.verticalChild,
              {
                id: nextSerial,
                direction: 'vertical',
                horizontalChildren: [],
                color: getRandomColor(),
              },
            ],
          };
        }
        return box;
      });

      return updatedBoxes;
    });
  };

  const handleHorizontal = () => {
    setBox((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        verticalChild: [],
        color: getRandomColor(),
      },
    ]);
  };

  const handleHorizontalChild = (mainId, verticalChildID) => {
    setBox((prevBoxes) => {
      const updatedBoxes = prevBoxes.map((box) => {
        if (box.id === mainId) {
          const updatedVerticalChildren = box.verticalChild.map((child) => {
            if (child.id === verticalChildID) {
              const nextSerial = child.horizontalChildren.length + 1;
              return {
                ...child,
                horizontalChildren: [
                  ...child.horizontalChildren,
                  {
                    id: nextSerial,
                    direction: 'horizontal',
                    color: getRandomColor(),
                  },
                ],
              };
            }
            return child;
          });
          return {
            ...box,
            verticalChild: updatedVerticalChildren,
          };
        }
        return box;
      });
      return updatedBoxes;
    });
  };
  console.log(box);
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle}>
      {box.map((item, key) => (
        <div
          key={key}
          style={{
            height: `${100 / 2}vh`,
            border: '1px solid black',
            marginBottom: '10px',
            background: item.color,
          }}
          className='flex p-1 justify-center items-center'
        >
          {item.verticalChild.length > 0 ? (
            item.verticalChild.map((VItem, VIndex) => (
              <div
                key={VIndex}
                style={{
                  height: `${100}%`,
                  border: '1px solid black',
                  marginBottom: '10px',
                }}
                className='h-full w-full overflow-auto'
              >
                {VItem?.horizontalChildren?.length > 0 ? (
                  VItem.horizontalChildren?.map((HChild, Hindex) => (
                    <div
                      style={{ background: HChild.color }}
                      key={Hindex}
                      className='bg-state-500 h-fit py-10 w-full flex flex-row border justify-center items-center'
                    >
                      <div>
                        <div className='flex gap-3 '>
                          <button
                            onClick={() => handleVertical(item.id)}
                            className='px-3 border rounded'
                          >
                            V
                          </button>
                          <button
                            onClick={() =>
                              handleHorizontalChild(item.id, VItem.id)
                            }
                            className='px-3 border rounded'
                          >
                            H
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{ background: VItem.color }}
                    className='bg-state-500 h-full w-full flex border justify-center items-center'
                  >
                    <div>
                      <div className='flex gap-3'>
                        <button
                          onClick={() => handleVertical(item.id)}
                          className='px-3 border rounded'
                        >
                          V
                        </button>
                        <button
                          onClick={() =>
                            handleHorizontalChild(item.id, VItem.id)
                          }
                          className='px-3 border rounded'
                        >
                          H
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
                  onClick={() => handleVertical(item.id)}
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
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
