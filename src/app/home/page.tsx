"use client"; // Ensure this component runs on the client side
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { CurrentNotificationType, medicinesType, NotificationType } from "@/lib/types/db";
import { useRouter } from "next/navigation";
import { MedicineSchema, NotificationMedicinesSchema, NotificationSchema } from "../../../drizzle/schema";


type notificationThisPageType = {
  closestNotification: CurrentNotificationType;
  allMedicines: [{
    medicines: MedicineSchema,
    notification_medicines: NotificationMedicinesSchema,
    notifications: NotificationSchema
  }]
}

const NotificationsPage = () => {
  const { user } = useUser();
  const [notification, setNotification] = useState<notificationThisPageType>();
  const [medicines, setMedicines] = useState<medicinesType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get("/api/notifications/time"); // Adjust the endpoint if necessary
        console.log(response.data);
        setNotification(response.data);
        
        console.log(notification);
        console.log(medicines);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    
    fetchNotification();
  }, []);
  let total = 0
  const router = useRouter()

  return (
    <div>
      <h1 className="text-center text-3xl mt-3">
        สวัสดี, {user?.firstName || "ผู้ใช้"}
      </h1>
      <p className="text-center text-md mt-3">วันนี้คุณทานยาหรือยัง?</p>
      {notification ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-3" onClick={()=>router.push(`/notification/${notification.closestNotification.id}`)}>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              การแจ้งเตือนครั้งถัดไป เวลา {notification.closestNotification.time}
            </div>
            <ul>{/* <li>{notificationMedicines['timing']}</li> */}</ul>
          </div>
          <hr className="h-px mt-2 mb-3 bg-black border-0 w-3/4 mx-auto" />
          {notification.allMedicines.map((pill) => {
						total += pill.notification_medicines.dosage_amount || 0;
						return (
							<li key={pill.medicines.name} className="text-lg">
								{pill.medicines.name} {pill.notification_medicines.dosage_amount || 1} {pill.notification_medicines.dosage_amount == 1 ? 'pill' : 'pills'} {pill.notification_medicines.timing}
							</li>
						);
					})}
          	<p className="text-center ">
				{notification.closestNotification.meal} total {total} pills
			</p>
        </div>
      ) : (
        <p>ไม่มีการแจ้งเตือนในขณะนี้.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
