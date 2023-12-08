import httpInstance from '@/utils/http.js'

export function getCategory(){
  return httpInstance({
    url:'home/category/head'
  })
}