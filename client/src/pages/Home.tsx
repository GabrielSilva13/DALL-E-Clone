import { useState, useEffect, ChangeEvent } from "react"

import { Loader, Card, FormField } from "../components"

const RenderCards = ({ data, title }: any) => {
  if (data?.length > 0)
    return data.map((post: any) => <Card key={post._id} {...post} />)

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  )
}

export const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState([])

  const [searchText, setSearchText] = useState("")
  const [searchedResults, setSearchedResults] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.ok) {
          const results = await response.json()

          setAllPosts(results.data.reverse())
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSearchChange = (e: any) => {
    //@ts-ignore
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      //@ts-ignore
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item: any) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        )
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Posts da comunidade
        </h1>
        <p className="mt-2 text-[#666e75] text-base max-w-[500px]">
          Veja e desfrute de uma coleção de imagens imaginarias e incríveis
          geradas pela DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName={"Procurar Posts"}
          type={"text"}
          name={"text"}
          placeholder={"Procurar Posts"}
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Resultados Encontrados para{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="Não encontrado" />
              ) : (
                <RenderCards data={allPosts} title="Nenhum post encontrado" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
