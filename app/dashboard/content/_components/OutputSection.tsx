import React, { useRef, useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface Props {
    aiOutput: string; 
}

function OutputSection({ aiOutput }: Props) {
    const editorRef = useRef<any>(null);

    useEffect(() => {
        const editorInstance = editorRef.current?.getInstance();
        if (editorInstance) {
            editorInstance.setMarkdown(aiOutput);
        }
    }, [aiOutput]);

    const handleCopy = () => {
        if (editorRef.current) {
            const markdown = editorRef.current.getInstance().getMarkdown();
            navigator.clipboard.writeText(markdown);
        }
    };

    return (
        <div className='bg-white shadow-lg border rounded-lg h-full flex flex-col'>
            <div className='flex justify-between items-center p-5'>
                <h2 className="font-medium text-lg">Your Result</h2>
                <Button className="flex gap-2" onClick={handleCopy}>
                    <Copy className='w-4 h-4' /> Copy
                </Button>
            </div>
            <Editor
                ref={editorRef}
                initialValue="Your Result will appear here"
                initialEditType="wysiwyg"
                height="100%"
                useCommandShortcut={true}
                onChange={() => console.log(editorRef.current?.getInstance().getMarkdown())}
            />
        </div>
    );
}

export default OutputSection;


