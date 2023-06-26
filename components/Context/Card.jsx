import { Calendar } from '@geist-ui/icons'
import { Button, Card, useToasts } from '@geist-ui/core'

const ContextCard = ({ getData, name, createdAt }) => {
  const { setToast } = useToasts()
  return (
    <>
      <Card paddingLeft={0.2} paddingRight={0.2} paddingTop={0.1} paddingBottom={0.5} marginTop={1} hoverable>
        <div className="textDiv">
          <p className="cardText">{name}</p>
          {createdAt && (
            <p className="cardText">
              <Calendar size={20} /> &nbsp; &nbsp;
              {`${new Date(createdAt).toDateString()} ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}`}
            </p>
          )}
        </div>
        <Button
          onClick={(e) => {
            fetch(`/api/context/del?createdAt=${createdAt}`, {
              method: 'DELETE',
            })
              .then((res) => res.json())
              .then((res) => {
                if (res['code'] === 1) {
                  setToast({
                    text: 'Successfully Deleted',
                    type: 'success',
                  })
                  getData(true)
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
          flex-wrap: wrap;
          flex-direction: row;
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

export default ContextCard
