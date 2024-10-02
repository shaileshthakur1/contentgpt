"use client";
import React, { useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { AIOutput } from "@/utils/schema";
import moment from "moment";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";

interface PROPS {
    params: {
        "template-slug": string;
    };
}

function CreateNewContent(props: PROPS) {
    const selectedTemplate: TEMPLATE | undefined = Templates?.find(
        (item) => item.slug === props.params["template-slug"]
    );
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>("");
    const { user } = useUser();

    const GenerateAIContent = async (formData: any) => {
        setLoading(true);
        const selectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
        const result = await chatSession.sendMessage(FinalAIPrompt);

        setAiOutput(result?.response.text());
        await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug || 'default-slug', result?.response.text());
        setLoading(false);
    };

    const SaveInDb = async (formData: string, slug: string, aiResp: string) => {
        const result = await db.insert(AIOutput).values({
            formData: formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous',
            createdAt: moment().format("DD/MM/yyyy"),
        });
        console.log(result);
    };

    return (
        <div className="p-10">
            <Link href="/dashboard">
                <Button>
                    <ArrowLeft /> Back
                </Button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 h-[calc(100vh-64px)]">
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenerateAIContent(v)}
                    loading={loading}
                />
                <OutputSection aiOutput={aiOutput} />
            </div>
        </div>
    );
}

export default CreateNewContent;
