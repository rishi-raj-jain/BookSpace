import { Calendar } from '@geist-ui/icons'
import { Button, Card, useToasts } from '@geist-ui/core'

export default function ({ name, spaceType, building, ifDirect, capacity, createdAt, image }) {
  const { setToast } = useToasts()
  return (
    <>
      <Card paddingLeft={0.2} paddingRight={0.2} paddingTop={0.1} paddingBottom={0.5} marginTop={1} hoverable>
        <div className="textDiv">
          {building && <p className="cardText">{`Building: ${building}`}</p>}
          {name && <p className="cardText">{`Name: ${name}`}</p>}
          {spaceType && <p className="cardText">{`Space Type: ${spaceType}`}</p>}
          {capacity && <p className="cardText">{`Capacity: ${capacity}`}</p>}
          <p className="cardText">{`Direct Booking: ${ifDirect ? 'Yes' : 'No'}`}</p>
          {createdAt && (
            <p className="cardText">
              <Calendar size={20} /> &nbsp; &nbsp;
              {`${new Date(createdAt).toDateString()} ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}`}
            </p>
          )}
        </div>
        <Button
          onClick={() => {
            fetch(`/api/spaces/handle?name=${name}`, {
              method: 'DELETE',
            })
              .then((res) => res.json())
              .then((res) => {
                if (res['code'] === 1) {
                  setToast({
                    text: 'Successfully Deleted',
                    type: 'success',
                  })
                } else {
                  console.log(res)
                  setToast({
                    text: 'Error While Deleting',
                    type: 'warning',
                  })
                }
              })
              .catch((e) => {
                console.log(e)
                setToast({
                  text: 'Error While Deleting',
                  type: 'warning',
                })
              })
          }}
          mt={1}
        >
          Delete
        </Button>
      </Card>
      <style jsx>{`
        .textDiv {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cardText {
          padding: 0;
          display: flex;
          margin-top: 5px;
          font-size: 0.8rem;
          align-items: center;
        }

        .descComp {
          display: flex;
          flex-direction: column;
        }

        .descDiv {
          font-size: 1rem;
          margin-top: 10px;
          padding: 5px 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          border: 1px solid gray;
        }
      `}</style>
    </>
  )
}
