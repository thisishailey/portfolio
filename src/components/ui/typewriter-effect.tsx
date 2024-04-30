'use client';

import { useEffect } from 'react';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function TypewriterEffect({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) {
    const wordsArray = words.map((word) => {
        return {
            ...word,
            text: word.text.split(''),
        };
    });

    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);

    useEffect(() => {
        setTimeout(() => {
            if (isInView) {
                animate(
                    'span',
                    {
                        display: 'inline-block',
                        opacity: 1,
                        width: 'fit-content',
                    },
                    {
                        duration: 0.3,
                        delay: stagger(0.1),
                        ease: 'easeInOut',
                    }
                );
            }
        }, 2000);
    }, [animate, isInView]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="inline">
                {wordsArray.map((word, idx) => {
                    return (
                        <div key={`word-${idx}`} className="inline-block">
                            {word.text.map((char, index) => (
                                <motion.span
                                    initial={{}}
                                    key={`char-${index}`}
                                    className={cn(
                                        `dark:text-white text-[--theme-dark] opacity-0 hidden`,
                                        word.className
                                    )}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp;
                        </div>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div
            className={cn(
                'text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center',
                className
            )}
        >
            {renderWords()}
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
                className={cn(
                    'inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-[--theme]',
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
}
