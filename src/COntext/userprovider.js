import React, { createContext } from "react"

const Usercontext = createContext()
const Userprovider = Usercontext.Provider
const Userconsumer = Usercontext.Consumer

export { Userprovider, Userconsumer, Usercontext }