import React, { useEffect, useState } from 'react'
import useFetch from '../../../Hooks/useFetch'
import Button from '../../../common/Form/Button'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios';
import { BaseURL } from '../../../Utils/Utils';
import toast from 'react-hot-toast';
import { CloudUploadOutlined, FolderOpenOutlined, InsertLinkOutlined } from '@mui/icons-material';
import useTitle from '../../../Hooks/useTitle';
import { useParams } from 'react-router-dom';



function Draft() {
    const title = useTitle("ویرایش مقاله پیش نویس - پنل کاربری")
    const { datas: categories } = useFetch("category", true)
    const {shortName} = useParams()
    const [blogTitle, setBlogTitle] = useState("")
    const [blogDescription, setBlogDescription] = useState("")
    const [blogShortName, setBlogShortName] = useState("")
    const [blogCategoryID, setBlogCategoryID] = useState("-1")
    const [blogBody , setBlogBody] = useState('')
    const [blogCover, setBlogCover] = useState({})
     //Publish Function
     const PublishBlogHandler = (event) => {
        event.preventDefault()
        let newBlogFormData = new FormData()
        newBlogFormData.append('title' , blogTitle)
        newBlogFormData.append('description' , blogDescription)
        newBlogFormData.append('shortName' , blogShortName)
        newBlogFormData.append('categoryID' , blogCategoryID)
        newBlogFormData.append('body' , blogBody)
        newBlogFormData.append('cover' , blogCover)
        console.log(blogTitle , blogDescription , blogShortName , blogBody , blogCategoryID , blogCover.name , blogTitle.length  , blogShortName.length  , blogBody.length)
         if(blogTitle && blogDescription && blogShortName && blogBody && blogCategoryID && blogCover.name && blogTitle.length  >= 2 && blogShortName.length >= 2 && blogBody.length >= 10){
           axios.post(`${BaseURL}articles` , newBlogFormData, {
             headers : {
               'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
             }
           })
           .then(response => {
             console.log(response)
             if(response.status === 201){
               
               toast.success("  افزودن مقاله با موفقیت انجام شد")
               setBlogTitle('')
               setBlogDescription('')
               setBlogShortName('')
               setBlogCategoryID('-1')
               setBlogCover('')
               setBlogBody('')
               setShowRealTimeDatas((prev) => !prev)
             }else{
               toast.error("افزودن مقاله انجام نشد");
             }
           })
           .catch(error => {
               console.log(error)
               toast.error('خطا در اتصال به سرور')
              })
            }else{
              toast.error('لطفا فرم را با تعداد کاراکتر مجاز تکمیل نمایید')
            }
       }
       useEffect(() => {
         axios.get(`${BaseURL}articles/${shortName}` , {
         headers : {
           'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
         }
       })
       .then(response => {
         console.log(response.data)
         setBlogTitle(response.data.title)
         setBlogShortName(response.data.shortName)
         setBlogDescription(response.data.description)
         setBlogCategoryID(response.data.categoryID._id)
         setBlogCover(response.data.cover)
         setBlogBody(response.data.body)
       })
       .catch(error => {
           console.log(error.message)
             toast.error(" خطا در برقراری با سرور")
       })
       } , [shortName]);
  return (
    <fieldset className="border border-gray-200 rounded-lg p-3">
        <legend className="font-DanaBold text-zinc-700 dark:text-white text-xl my-6 mx-10 px-3">
          ویرایش مقاله پیش نویس
        </legend>
        <div className="flex flex-wrap justify-between gap-5 child:w-48p">
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder="عنوان  *"
              value={blogTitle}
              onChange={(event) => setBlogTitle(event.target.value)}
            />
            <FolderOpenOutlined className="left-3 sm:left-4" />
          </div>
          <div className="relative">
            <input
              type="text"
              className="outline-none pl-9 sm:pl-12 bg-white"
              placeholder=" لینک *"
              value={blogShortName}
              onChange={(event) => setBlogShortName(event.target.value)}
            />
            <InsertLinkOutlined className="left-3 sm:left-4" />
          </div>
          <textarea rows="8" placeholder='  چکیده *' value={blogDescription} onChange={(event) => setBlogDescription(event.target.value)} className='mb-3 block w-full outline-none p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 rounded-2xl placeholder:font-danaLight transition-colors'></textarea> 
           <div className="relative">
            <select
              value={blogCategoryID}
              defaultValue={'-1'}
              onChange={(event) => setBlogCategoryID(event.target.value)}
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={'-1'} disabled>انتخاب دسته بندی </option>
              {categories.map(({ _id, title }) => {
                return (
                  <React.Fragment key={_id}>
                    <option value={_id} className="px-3">
                      {title}
                    </option>
                  </React.Fragment>
                );
              })}
            </select>
        <div className="flex-center w-full mx-auto my-3">
          <div className="flex-center w-full relative">
            <label
              htmlFor="CoverUpload"
              className="flex-center flex-col w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex-center flex-col pt-5 pb-6">
                <CloudUploadOutlined className="text-gray-500 mb-2" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">انتخاب فایل</span> یا فایل را
                  بکشید و اینجا رها کنید
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  WEBP, PNG, JPG , JPEG (سایز 768x432px )
                </p>
               <span className="text-mainSlate dark:text-white my-3">{blogCover.name}</span> 
              </div>
              <input id="CoverUpload" type="file" required onChange={(event) => setBlogCover(event.target.files[0])} accept=".webp , .jpg , .png, .jpeg" className="h-full absolute z-50 opacity-0" />
            </label>
          </div>
        </div>
          </div>
    
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={blogBody}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBlogBody(data);
          }}
        />
        <div className="flex justify-end items-center gap-5">
          <Button
            btnType="submit"
            className="button-md h-12 sm:button-lg rounded-xl button-primary my-5 sm:mt-4 disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            onClick={PublishBlogHandler}
          >
            انتشار مقاله
          </Button>
        </div>
      </fieldset>
  )
}

export default Draft
