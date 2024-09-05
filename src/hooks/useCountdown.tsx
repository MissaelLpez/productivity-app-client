import { useEffect, useState } from "react";

const useCountdown = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (initialTime <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  // Asegúrate de que el tiempo restante se convierte correctamente
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export default useCountdown;
