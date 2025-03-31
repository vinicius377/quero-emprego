import { PrivateRoute } from "@/components/shared/PrivateRoute";
import { trpc } from "@/lib/trpc";
import { Role } from "@packages/types/enums";
import { useSuspenseQuery } from "@tanstack/react-query";
import { updateCandidateValidator } from "@packages/validators/candidate/update-candidate"
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";
import { Empty } from "@/components/shared/Empty";
import { toast } from "react-toastify";

type Profile = z.infer<typeof updateCandidateValidator>

function ProfileComponent() {
  const { data: candidate } = useSuspenseQuery({
    queryKey: ["get-candidate-token"],
    queryFn: () => trpc.candidate.getByToken.query()
  })
  const {
    register,
    setValue,
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: zodResolver(updateCandidateValidator),
    defaultValues: {
      education: [],
      experience: []
    }
  })
  const limitBirthDate = useMemo(() => {
    const date = new Date()
    const yearsToJob = 16
    date.setFullYear(date.getFullYear() - yearsToJob)
    return date
  }, [])

  const {
    fields: education,
    append: appendEducation,
    update: updateEducation,
    remove: removeEducation
  } = useFieldArray({
    control,
    name: "education"
  })

  const {
    fields: experience,
    append: appendExperience,
    update: updateExperience,
    remove: removeExperience
  } = useFieldArray({
    control,
    name: "experience"
  })

  const onSubmit = async (data: Profile) => {
    try {
      await trpc.candidate.edit.mutate(data)
      toast.success("Perfil editado")
    } catch (e) {
      toast.error(e.message)
    }
  }

  useEffect(() => {
    if (candidate) {
      reset(candidate)
    }
  }, [candidate, reset])

  const addNewEducation = () => {
    appendEducation({ courseName: "", institution: "", endDate: new Date(), startDate: new Date() })
  }

  const addNewExperience = () => {
    appendExperience({ roleName: "", businessName: "", description: "", endDate: new Date(), startDate: new Date() })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="space-y-4">
        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Dados pessoais</h2>
          <div className="flex flex-col gap-2 md:flex-row">
            <Input
              {...register("name")}
              placeholder="Digite seu nome"
              error={errors.name?.message} />
            <Input
              {...register("phoneNumber")}
              placeholder="Digite seu número"
              error={errors.phoneNumber?.message} />
          </div>
          <Input
            {...register("title")}
            placeholder="Digite um titulo"
            error={errors.title?.message}
          />
          <Textarea
            {...register("description")}
            placeholder="Digite uma descrição"
            className="max-h-[20rem] overflow-auto "
            error={errors.description?.message}
          />
          <DatePicker
            title="Data de nascimento"
            limiteAfter={limitBirthDate}
            selected={watch('birthDate')}
            onSelect={(date) => setValue('birthDate', date as Date)}
          />
        </section>
        <section className="space-y-2">
          <h1 className="font-semibold text-lg">Educação</h1>
          {education.length ? education.map((ed, index) => (
            <div key={ed.courseName} className="space-y-2 bg-white rounded p-2 border border-b-neutral-400 shadow-md">
              <Input
                {...register(`education.${index}.courseName`)}
                placeholder="Digite o nome do curso"
                error={errors.education?.[index]?.courseName?.message}
              />
              <Input
                {...register(`education.${index}.institution`)}
                placeholder="Digite o nome da instituição"
                error={errors.education?.[index]?.institution?.message}
              />
              <div className="flex gap-2 flex-col md:flex-row">
                <DatePicker
                  title="Data de inicio"
                  selected={ed.startDate}
                  onSelect={(date) => {
                    updateEducation(index, {
                      ...ed,
                      startDate: date as Date
                    })
                  }}
                />
                <DatePicker
                  title="Data de término (ou previsão)"
                  selected={ed.endDate}
                  limitBefore={new Date(ed.startDate)}
                  onSelect={(date) => {
                    updateEducation(index, {
                      ...ed,
                      endDate: date as Date
                    })
                  }}
                />
              </div>
              <Button onClick={() => removeEducation(index)} variant="destructive">Remover</Button>
            </div>
          )) : <Empty size="md" text="Ainda não há nenhum curso cadastrado." />}
          <Button
            type="button"
            variant="secondary"
            onClick={addNewEducation}
          >Adicionar</Button>
        </section>
        <section className="space-y-2">
          <h1 className="font-semibold text-lg">Experiência</h1>
          {experience.length ? experience.map((exp, index) => (
            <div key={exp.roleName} className="space-y-2 bg-white rounded p-2 border border-b-neutral-400 shadow-md">
              <Input
                {...register(`experience.${index}.roleName`)}
                placeholder="Digite o nome do cargo"
                error={errors.experience?.[index]?.roleName?.message}
              />
              <Input
                {...register(`experience.${index}.businessName`)}
                placeholder="Digite o nome da empresa"
                error={errors.experience?.[index]?.businessName?.message}
              />
              <Textarea
                {...register(`experience.${index}.description`)}
                placeholder="Digite uma descrição do seu cargo"
                error={errors.experience?.[index]?.description?.message}
                className="max-h-[20rem] overflow-auto"
              />
              <div className="flex gap-2 flex-col md:flex-row">
                <DatePicker
                  title="Data de inicio"
                  selected={exp.startDate}
                  onSelect={(date) => {
                    updateExperience(index, {
                      ...exp,
                      startDate: date as Date
                    })
                  }}
                />
                <DatePicker
                  title="Data de término (opcional)"
                  selected={exp.endDate as Date}
                  limitBefore={new Date(exp.startDate)}
                  onSelect={(date) => {
                    updateExperience(index, {
                      ...exp,
                      endDate: date as Date
                    })
                  }}
                />
              </div>
              <Button onClick={() => removeExperience(index)} variant="destructive">Remover</Button>
            </div>
          )) : <Empty size="md" text="Ainda não há nenhuma experiência cadastrada." />}
          <Button
            type="button"
            variant="secondary"
            onClick={addNewExperience}
          >Adicionar</Button>
        </section>
      </div>
      <div className="flex justify-end mt-2">
        <Button type="submit" disabled={isSubmitting}>Salvar</Button>
      </div>
    </form>
  )
}

export const Profile = (
  <PrivateRoute role={Role.candidate}>
    <ProfileComponent />
  </PrivateRoute>
)