import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

function AddButton({ text }: { text: string }) {
    return (
        <Button className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all text-sm shadow-sm group">
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>{text}</span>
        </Button>
    )
}

export default AddButton