import Button from '../components/ui/button'
import { useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorScreen() {
  const navigate = useNavigate()
  const error = useRouteError() as Error
  console.error(error)

  return (
    <div className="w-80 h-full mx-auto flex items-center justify-center">
      <div className="w-fit h-fit p-10 rounded-2xl bg-primary-100 flex flex-col gap-12">
        <div>
          <h1 className="text-center text-[80px] font-bold m-0">Oops!</h1>
          <p className="text-xl text-center">Désolé, une erreur inattendue s'est produite.</p>
        </div>
        <div className="flex items-center justify-center">
          <Button text="Retour" handleClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  )
}
