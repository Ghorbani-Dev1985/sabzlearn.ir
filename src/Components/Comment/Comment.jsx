import React from "react";
import UsersIcon from "../../assets/Images/CommentFormUser/none.png";
import { Reply } from "@mui/icons-material";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import Button from "../../common/Form/Button";
import { Alert } from "@mui/material";
import { ChangeGregorianDateToPersian } from "../../Utils/Utils";

function Comment({
  showNewCommentForm,
  setShowNewCommentForm,
  NewCommentHandler,
  comments,
}) {
  console.log(comments);
  return (
    <div className="bg-white dark:bg-gray-800 px-3.5 md:px-5 pt-5 md:pt-7 pb-3.5 md:pb-6 shadow-light dark:shadow-none rounded-2xl mt-4 sm:mt-5">
      {/* Head & Sent Btn */}
      <div className="flex-between flex-wrap mb-5">
        <div className="flex items-center gap-x-3.5">
          <span className="block w-2.5 h-10 bg-pink-500 dark:bg-rose-500 rounded-sm"></span>
          <h3 className="text-zinc-700 dark:text-white font-MorabbaBold text-2xl md:text-3xl">
            نظرات
          </h3>
        </div>
        <Button
          btnType="submit"
          className="button-md button-primary rounded-xl disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
          disabled={false}
          onClick={NewCommentHandler}
        >
          ایجاد نظر جدید
        </Button>
      </div>
      <NewCommentForm
        showNewCommentForm={showNewCommentForm}
        setShowNewCommentForm={setShowNewCommentForm}
      />
      {/* Comment Items */}
      {comments.length > 0 ? (
        <div className="space-y-3.5 sm:space-y-5 ">
          {comments.map(
            ({ _id, body, createdAt, creator, answer, answerContent }) => {
              return (
                <div
                  key={_id}
                  className="p-3.5 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl"
                >
                  <div className="flex gap-x-5 items-start">
                    {/* User Icon */}
                    <div className="space-y-3.5 sm:space-y-5 ">
                      {creator.profile ? (
                        <img
                          src={creator.profile}
                          className="block md:hidden size-10 object-cover rounded-full shrink-0"
                          alt="ghorbani-dev.ir"
                        />
                      ) : (
                        <img
                          src={UsersIcon}
                          className="block md:hidden size-10 object-cover rounded-full shrink-0"
                          alt="ghorbani-dev.ir"
                        />
                      )}
                      {creator.role === "ADMIN" ? (
                        <div className="flex-center w-14 h-5 rounded-sm text-xs leading-4 bg-sky-500 text-white dark:bg-secondary/10 dark:text-secondary">
                          مدرس
                        </div>
                      ) : (
                        <div className="flex-center w-14 h-5 rounded-sm text-xs leading-4 bg-primary text-white dark:bg-primary/10 dark:text-primary">
                          دانشجو
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <div className="flex-between">
                        <div className="flex items-center gap-x-2">
                          <img
                            src={UsersIcon}
                            className="block md:hidden size-10 object-cover rounded-full shrink-0"
                            alt="ghorbani-dev.ir"
                          />
                          <div className="shrink-0">
                            <span className="text-zinc-700 dark:text-white font-DanaMd text-base md:text-xl">
                              {creator.username}
                            </span>
                            <div className="flex items-center gap-x-1.5 mt-1">
                              <div className="flex-center md:hidden w-14 h-5 rounded-sm text-xs leading-4 bg-primary text-white dark:bg-primary/10 dark:text-primary">
                                دانشجو
                              </div>
                              <span className="font-Dana text-slate-500 dark:text-white text-xs">
                                {ChangeGregorianDateToPersian(createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          btnType="button"
                          className="w-16 h-10 text-slate-500 dark:text-gray-500"
                          disabled={false}
                          onClick={NewCommentHandler}
                        >
                          {" "}
                          <Reply className="w-16 h-10" />{" "}
                        </Button>
                      </div>
                      <div className="text-zinc-700 dark:text-white font-Dana leading-7 mt-3.5">
                        {body}
                      </div>
                      {answer > 0 && (
                        <div className="mt-7 space-y-3.5 md:space-y-5">
                          <div className="mt-7 p-3.5 md:p-5 bg-gray-200 dark:bg-mainSlate rounded-2xl">
                            <div className="flex gap-x-5 items-start">
                              <div className="hidden md:flex flex-col gap-y-2">
                                {answerContent.profile ? (
                                  <img
                                    src={answerContent.profile}
                                    className="block md:hidden size-10 object-cover rounded-full shrink-0"
                                    alt="ghorbani-dev.ir"
                                  />
                                ) : (
                                  <img
                                    src={UsersIcon}
                                    className="block md:hidden size-10 object-cover rounded-full shrink-0"
                                    alt="ghorbani-dev.ir"
                                  />
                                )}
                                {answerContent.creator.role === "ADMIN" ? (
                                  <div className="flex-center w-14 h-5 rounded-sm text-xs leading-4 bg-sky-500 text-white dark:bg-secondary/10 dark:text-secondary">
                                    مدرس
                                  </div>
                                ) : (
                                  <div className="flex-center w-14 h-5 rounded-sm text-xs leading-4 bg-primary text-white dark:bg-primary/10 dark:text-primary">
                                    دانشجو
                                  </div>
                                )}
                              </div>
                              <div className="w-full">
                                <div className="flex-between">
                                  <div className="flex items-center gap-x-2">
                                    {answerContent.profile ? (
                                      <img
                                        src={answerContent.profile}
                                        className="block md:hidden size-10 object-cover rounded-full shrink-0"
                                        alt="ghorbani-dev.ir"
                                      />
                                    ) : (
                                      <img
                                        src={UsersIcon}
                                        className="block md:hidden size-10 object-cover rounded-full shrink-0"
                                        alt="ghorbani-dev.ir"
                                      />
                                    )}

                                    <div className="shrink-0">
                                      <span className="text-zinc-700 dark:text-white font-DanaMd text-base md:text-xl">
                                        {answerContent.creator.name}
                                      </span>
                                      <div className="flex items-center gap-x-1.5 mt-1">
                                        {answerContent.creator.role ===
                                        "ADMIN" ? (
                                          <div className="flex-center w-14 h-5 rounded-sm text-xs leading-4 bg-sky-500 text-white dark:bg-secondary/10 dark:text-secondary">
                                            مدرس
                                          </div>
                                        ) : (
                                          <div className="flex-center w-14 h-5 rounded-sm text-xs leading-4 bg-primary text-white dark:bg-primary/10 dark:text-primary">
                                            دانشجو
                                          </div>
                                        )}
                                        <span className="font-Dana text-slate-500 dark:text-white text-xs">
                                          {ChangeGregorianDateToPersian(
                                            answerContent.createdAt
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-zinc-700 dark:text-white font-Dana leading-7 mt-3.5">
                                  {answerContent.body}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <Alert severity="info" className="dark:bg-mainSlate dark:text-sky-500">
          تاکنون نظری ثبت نگردیده است
        </Alert>
      )}
    </div>
  );
}

export default Comment;
