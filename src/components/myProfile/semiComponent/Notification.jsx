import React from 'react'

const Notification = () => {
  return (
     <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            <div className="flex justify-between border-b pb-3">
              <span>Job alerts</span>
              <span className="text-blue-600">Allow</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Messages</span>
              <span className="text-blue-600">Allow</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Promotions</span>
              <span className="text-blue-600">Mute</span>
            </div>
          </div>
  )
}

export default Notification
