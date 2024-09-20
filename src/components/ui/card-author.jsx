return (
    <>
<motion.ul
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [40, 0, 0],
        }}
        transition={{
          duration: 1,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="mt-2 mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-2"
      >
        {filteredEBooks.length > 0 ? (
          filteredEBooks.map((ebook) => (
            <motion.div
              layoutId={`ebook-${ebook.title}-${id}`}
              key={ebook.title}
              onClick={() => specificBook(ebook)}
              className="p-4 flex flex-col hover:bg-blue-100 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${ebook.title}-${id}`}>
                  <ImageWithSkeleton
                    src={`https://gateway.pinata.cloud/ipfs/${ebook.cover}`}
                    alt={ebook.title}
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col">
                  <motion.h3
                    layoutId={`title-${ebook.title}-${id}`}
                    className="font-medium text-gray-900 text-center md:text-left text-base"
                  >
                    {ebook.title || <Skeleton />}
                  </motion.h3>
                  <motion.p
                    layoutId={`author-${ebook.author}-${id}`}
                    className="text-gray-600 text-center md:text-left text-base"
                  >
                    {truncate(ebook.author, 4, 4, 11) || <Skeleton />}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.h2
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [40, 0, 0],
            }}
            transition={{
              duration: 1,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="col-span-1 md:col-span-4 text-base md:text-lg lg:text-xl text-center text-gray-400 font-semibold"
          >
            {message}
          </motion.h2>
        )}
      </motion.ul>
</>
)