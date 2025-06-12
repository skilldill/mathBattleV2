import { useTranslation } from "react-i18next";
import { IonTextarea } from "@ionic/react";
import { Block } from "../Glass/Block";
import { ColumnLayout } from "../ColumnLayout/ColumnLayout";

interface TextareaShareProps {
    text: string;
}

export const TextareaShare = ({ text }: TextareaShareProps) => {
    const { t } = useTranslation();
    return (
        <div style={{ padding: 20, paddingTop: 60 }}>
            <ColumnLayout style={{ gap: 20 }}>
                <p>{t('textSharePointerForHandleCopy')}</p>
                <Block>
                    <IonTextarea rows={6} readonly value={text} />
                </Block>
            </ColumnLayout>
        </div>
    )
} 