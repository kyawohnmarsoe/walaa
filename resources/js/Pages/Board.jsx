import React from "react";
import { useState } from "react";
import Textarea from '@/Components/Textarea';
import { usePage,router } from '@inertiajs/react';



export default function Board ({ board }) {
    let { flash } = usePage().props
    const [writing, setWriting] = !!board.length ? useState(board[0]['writing']) : useState('')

    const saveEdits =()=>{
       
        router.post(`/dashboard/writing/`, { board: writing, id: board[0]['id'] })
    }
  return (
      <div className="pt-12 ">
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <section className="p-4">
                      <header>
                          {/* <h2 className="text-lg font-medium text-sky-600">Online Users</h2> */}

                          <p className="mt-1 text-sm text-gray-600 float-left">
                              Last Updated By : { board[0]?.modifyUser }
                            </p>
                          <button className="btn btn-xs btn-outline btn-default mb-2 float-right" onClick={saveEdits}>
                              Save
                          </button>
                      </header>
                  </section>
                 
                  <div className="px-3">
                      {
                          writing && <Textarea
                              id="writing"
                              name="writing"
                              value={ writing }
                              onChange={ (e) => setWriting(e.target.value) }
                              className="my-3 block w-full border-none focus:outline-none"

                              minRows={ 10 }
                          />
                      }
                  </div>
              </div>
          </div>
      </div >
  )
}
